// Permission & Role Management Hook
import { useState, useEffect, useCallback, useMemo } from 'react';
import { message } from 'antd';
import type { Permission, RoleGroup, TableParams } from '../types/admin';
import { permissions as mockPermissions, roleGroups as mockRoleGroups } from '../constants/adminData';

interface RoleFilters {
  search?: string;
  isSystem?: boolean;
}

export const usePermissionManagement = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roleGroups, setRoleGroups] = useState<RoleGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<RoleGroup | null>(null);
  const [filters, setFilters] = useState<RoleFilters>({});
  const [tableParams, setTableParams] = useState<TableParams>({
    page: 1,
    pageSize: 10,
  });

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPermissions(mockPermissions);
      setRoleGroups(mockRoleGroups);
    } catch (error) {
      message.error('Không thể tải dữ liệu phân quyền');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter roles
  const filteredRoles = useMemo(() => {
    let result = [...roleGroups];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        r =>
          r.name.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.isSystem !== undefined) {
      result = result.filter(r => r.isSystem === filters.isSystem);
    }

    return result;
  }, [roleGroups, filters]);

  // Group permissions by module
  const permissionsByModule = useMemo(() => {
    const grouped: Record<string, Permission[]> = {};
    permissions.forEach(p => {
      if (!grouped[p.module]) {
        grouped[p.module] = [];
      }
      grouped[p.module].push(p);
    });
    return grouped;
  }, [permissions]);

  // Create role group
  const createRoleGroup = useCallback(async (data: Omit<RoleGroup, 'id' | 'usersCount' | 'createdAt'>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newRole: RoleGroup = {
        ...data,
        id: `role-${Date.now()}`,
        usersCount: 0,
        createdAt: new Date().toISOString(),
      };
      
      setRoleGroups(prev => [...prev, newRole]);
      
      message.success('Đã tạo nhóm quyền mới');
      return { success: true, role: newRole };
    } catch (error) {
      message.error('Không thể tạo nhóm quyền');
      return { success: false };
    }
  }, []);

  // Update role group
  const updateRoleGroup = useCallback(async (roleId: string, data: Partial<RoleGroup>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const role = roleGroups.find(r => r.id === roleId);
      if (role?.isSystem && data.permissions) {
        message.warning('Không thể thay đổi quyền của nhóm hệ thống');
        return { success: false };
      }
      
      setRoleGroups(prev =>
        prev.map(r =>
          r.id === roleId ? { ...r, ...data } : r
        )
      );
      
      message.success('Đã cập nhật nhóm quyền');
      return { success: true };
    } catch (error) {
      message.error('Không thể cập nhật nhóm quyền');
      return { success: false };
    }
  }, [roleGroups]);

  // Delete role group
  const deleteRoleGroup = useCallback(async (roleId: string) => {
    try {
      const role = roleGroups.find(r => r.id === roleId);
      if (role?.isSystem) {
        message.error('Không thể xóa nhóm quyền hệ thống');
        return { success: false };
      }
      
      if (role && role.usersCount > 0) {
        message.error('Không thể xóa nhóm quyền đang có người dùng');
        return { success: false };
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRoleGroups(prev => prev.filter(r => r.id !== roleId));
      
      message.success('Đã xóa nhóm quyền');
      return { success: true };
    } catch (error) {
      message.error('Không thể xóa nhóm quyền');
      return { success: false };
    }
  }, [roleGroups]);

  // Update role permissions
  const updateRolePermissions = useCallback(async (roleId: string, permissionCodes: string[]) => {
    try {
      const role = roleGroups.find(r => r.id === roleId);
      if (role?.isSystem) {
        message.warning('Không thể thay đổi quyền của nhóm hệ thống');
        return { success: false };
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRoleGroups(prev =>
        prev.map(r =>
          r.id === roleId ? { ...r, permissions: permissionCodes } : r
        )
      );
      
      message.success('Đã cập nhật quyền');
      return { success: true };
    } catch (error) {
      message.error('Không thể cập nhật quyền');
      return { success: false };
    }
  }, [roleGroups]);

  // Clone role group
  const cloneRoleGroup = useCallback(async (roleId: string, newName: string) => {
    try {
      const role = roleGroups.find(r => r.id === roleId);
      if (!role) {
        message.error('Không tìm thấy nhóm quyền');
        return { success: false };
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const clonedRole: RoleGroup = {
        ...role,
        id: `role-${Date.now()}`,
        name: newName,
        description: `Sao chép từ ${role.name}`,
        usersCount: 0,
        isSystem: false,
        createdAt: new Date().toISOString(),
      };
      
      setRoleGroups(prev => [...prev, clonedRole]);
      
      message.success('Đã sao chép nhóm quyền');
      return { success: true, role: clonedRole };
    } catch (error) {
      message.error('Không thể sao chép nhóm quyền');
      return { success: false };
    }
  }, [roleGroups]);

  // Check if role has permission
  const roleHasPermission = useCallback((roleId: string, permissionCode: string) => {
    const role = roleGroups.find(r => r.id === roleId);
    if (!role) return false;
    return role.permissions.includes(permissionCode);
  }, [roleGroups]);

  // Get role by ID
  const getRoleById = useCallback((roleId: string) => {
    return roleGroups.find(r => r.id === roleId) || null;
  }, [roleGroups]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Statistics
  const statistics = useMemo(() => ({
    totalRoles: roleGroups.length,
    systemRoles: roleGroups.filter(r => r.isSystem).length,
    customRoles: roleGroups.filter(r => !r.isSystem).length,
    totalPermissions: permissions.length,
    modules: Object.keys(permissionsByModule).length,
    totalUsersWithRoles: roleGroups.reduce((sum, r) => sum + r.usersCount, 0),
  }), [roleGroups, permissions, permissionsByModule]);

  return {
    permissions,
    roleGroups: filteredRoles,
    allRoleGroups: roleGroups,
    loading,
    selectedRole,
    setSelectedRole,
    filters,
    setFilters,
    tableParams,
    setTableParams,
    statistics,
    permissionsByModule,
    fetchData,
    createRoleGroup,
    updateRoleGroup,
    deleteRoleGroup,
    updateRolePermissions,
    cloneRoleGroup,
    roleHasPermission,
    getRoleById,
  };
};

