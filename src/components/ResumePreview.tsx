import React from 'react';
import { ResumeData, TemplateType } from '../types';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: TemplateType;
  isPrintMode?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template, isPrintMode = false }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {!isPrintMode && (
        <div className="p-4 bg-gray-50 border-b">
          
        </div>
      )}
      <div className={`p-4 overflow-auto ${isPrintMode ? '' : 'max-h-[800px]'}`} style={{ minHeight: isPrintMode ? 'auto' : '500px' }}>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;