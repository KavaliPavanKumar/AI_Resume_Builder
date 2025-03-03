import React from 'react';
import { ResumeData } from '../../types';

interface ClassicTemplateProps {
  resumeData: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="font-serif max-w-4xl mx-auto bg-white text-gray-800 p-8" id="resume-content">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{personalInfo.name || 'Your Name'}</h1>
        
        <div className="text-sm space-x-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 mb-3 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 mb-3 pb-1">
            Professional Experience
          </h2>
          
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg">{exp.position}</h3>
                <span className="text-gray-600 italic">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              
              <h4 className="font-semibold">{exp.company}</h4>
              
              {exp.description && (
                <p className="my-1 text-gray-700">{exp.description}</p>
              )}
              
              {exp.bullets.length > 0 && (
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
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
          <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 mb-3 pb-1">
            Education
          </h2>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{edu.institution}</h3>
                <span className="text-gray-600 italic">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              
              <p className="font-semibold">
                {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
              </p>
              
              {edu.description && (
                <p className="mt-1 text-gray-700">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 mb-3 pb-1">
            Skills
          </h2>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-gray-600 text-sm ml-1">({skill.level})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 mb-3 pb-1">
            Projects
          </h2>
          
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{project.name}</h3>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline italic"
                  >
                    View Project
                  </a>
                )}
              </div>
              
              {project.technologies && (
                <p className="font-semibold">{project.technologies}</p>
              )}
              
              {project.description && (
                <p className="mt-1 text-gray-700">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;