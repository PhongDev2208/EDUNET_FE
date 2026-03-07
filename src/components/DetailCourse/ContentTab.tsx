import React from 'react';
import { Collapse } from 'antd';
import { ReadOutlined, FileProtectOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface ContentTabProps {
  content: { title: string; items: string[] }[];
}

const ContentTab: React.FC<ContentTabProps> = ({ content }) => {
  return (
    <div className="py-4">
      <Collapse defaultActiveKey={['0']} ghost>
        {content?.map((section, index) => (
          <Panel header={<span className="font-semibold text-lg">{section.title}</span>} key={index}>
            <ul className="list-none pl-0">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ReadOutlined className="text-[#e5698e]" />
                    <span>{item}</span>
                  </div>
                  <FileProtectOutlined className="text-gray-400" />
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default ContentTab;
