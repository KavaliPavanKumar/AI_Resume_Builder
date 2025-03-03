import React from 'react';
import { TemplateType } from '../types';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const templates: { id: TemplateType; name: string; description: string }[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional with a touch of color',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional format with a timeless appeal',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and straightforward design',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="h-32 bg-gray-100 mb-3 flex items-center justify-center rounded">
              <span className="text-lg font-medium">{template.name}</span>
            </div>
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;