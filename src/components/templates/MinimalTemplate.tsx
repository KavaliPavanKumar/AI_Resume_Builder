import React from 'react';
import { ResumeData } from '../../types';

interface MinimalTemplateProps {
  resumeData: ResumeData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="font-sans max-w-4xl mx-auto bg-white text-gray-800 p-8" id="resume-content">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{personalInfo.name || 'Your Name'}</h1>
        
        <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-200 pb-1">
            Experience
          </h2>
          
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              
              <h4 className="text-gray-700">{exp.company}</h4>
              
              {exp.bullets.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-sm space-y-1 text-gray-700">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-200 pb-1">
            Education
          </h2>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{edu.institution}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              
              <p className="text-gray-700">
                {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Two Column Layout for Skills and Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-gray-200 pb-1">
              Skills
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-gray-200 pb-1">
              Projects
            </h2>
            
            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{project.name}</h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Link
                    </a>
                  )}
                </div>
                
                {project.technologies && (
                  <p className="text-sm text-gray-600">{project.technologies}</p>
                )}
                
                {project.description && (
                  <p className="text-sm mt-1 text-gray-700">{project.description}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;