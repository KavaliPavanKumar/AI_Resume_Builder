import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="font-sans max-w-4xl mx-auto bg-white text-gray-800 p-8" id="resume-content">
      {/* Header */}
      <header className="border-b-2 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-800">{personalInfo.name || 'Your Name'}</h1>
        
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1 text-blue-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1 text-blue-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-blue-600" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1 text-blue-600" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
        
        {personalInfo.summary && (
          <p className="mt-4 text-gray-600">{personalInfo.summary}</p>
        )}
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Experience Section */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-200 pb-1">
                Professional Experience
              </h2>
              
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  
                  <h4 className="text-blue-600 font-medium">{exp.company}</h4>
                  
                  {exp.description && (
                    <p className="text-sm mt-1 text-gray-600">{exp.description}</p>
                  )}
                  
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-200 pb-1">
                Projects
              </h2>
              
              {projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{project.name}</h3>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  
                  {project.technologies && (
                    <p className="text-blue-600 font-medium text-sm">{project.technologies}</p>
                  )}
                  
                  {project.description && (
                    <p className="text-sm mt-1 text-gray-600">{project.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-200 pb-1">
                Education
              </h2>
              
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-blue-600 font-medium">
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </p>
                  
                  <p className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  
                  {edu.description && (
                    <p className="text-sm mt-1 text-gray-600">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-200 pb-1">
                Skills
              </h2>
              
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;