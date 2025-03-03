import React, { useState, useRef } from 'react';
import { ResumeData, TemplateType } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import { FileDown, FileText, Sparkles } from 'lucide-react';
import { usePDF } from 'react-to-pdf';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const { toPDF, targetRef } = usePDF({
    filename: `${resumeData.personalInfo.name || 'resume'}.pdf`,
    page: { format: 'A4' }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toPDF()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FileDown className="h-4 w-4 mr-1" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-start">
            <Sparkles className="h-10 w-10 mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-2">Create Your Professional Resume</h2>
              <p className="text-blue-100">
                Fill in your details, choose a template, and let AI help you craft compelling bullet points for your experience and skills. Download your polished resume as a PDF when you're done.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as 'edit' | 'preview')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="edit">Edit Resume</option>
              <option value="preview">Preview Resume</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`${
                    activeTab === 'edit'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Edit Resume
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`${
                    activeTab === 'preview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Preview Resume
                </button>
              </nav>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form or Preview */}
          <div className={`lg:col-span-2 ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
            {activeTab === 'edit' ? (
              <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            ) : (
              <div ref={targetRef}>
                <ResumePreview resumeData={resumeData} template={selectedTemplate} />
              </div>
            )}
          </div>

          {/* Right Column - Template Selector and Preview */}
          <div className={`${activeTab === 'preview' ? 'block lg:hidden' : 'hidden'} lg:block`}>
            <div className="space-y-6">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
              
              <div className="hidden lg:block">
                <div className="sr-only" ref={targetRef}>
                  <ResumePreview resumeData={resumeData} template={selectedTemplate} isPrintMode={true} />
                </div>
                <ResumePreview resumeData={resumeData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2025 AI Resume Builder by Pavan Kavali. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;