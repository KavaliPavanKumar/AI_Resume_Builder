import React, { useState } from 'react';
import { ResumeData, Education, Experience, Skill, Project } from '../types';
import { generateBulletPoints, suggestSkills } from '../utils/aiSuggestions';
import { PlusCircle, Trash2, Sparkles } from 'lucide-react';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bullets: [],
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
    };
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: '',
    };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    });
  };

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((project) => project.id !== id),
    });
  };

  const handleGenerateBullets = async (id: string) => {
    const experience = resumeData.experience.find((exp) => exp.id === id);
    if (!experience) return;

    setIsGenerating(true);
    try {
      const bullets = await generateBulletPoints(
        experience.position,
        experience.description
      );
      updateExperience(id, 'bullets', bullets);
    } catch (error) {
      console.error('Error generating bullets:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestSkills = async () => {
    // Get the most recent job position
    const latestExperience = resumeData.experience[0]?.position;
    if (!latestExperience) return;

    setIsGenerating(true);
    try {
      const suggestedSkills = await suggestSkills(latestExperience);
      
      // Add suggested skills that don't already exist
      const existingSkillNames = new Set(resumeData.skills.map(s => s.name.toLowerCase()));
      const newSkills = suggestedSkills
        .filter(skill => !existingSkillNames.has(skill.toLowerCase()))
        .map(skill => ({
          id: Date.now() + Math.random().toString(),
          name: skill,
          level: 'Intermediate'
        }));
      
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, ...newSkills]
      });
    } catch (error) {
      console.error('Error suggesting skills:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === 'personal' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'education' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'experience' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'skills' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'projects' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
        </div>
      </div>

      {activeTab === 'personal' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={resumeData.personalInfo.name}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={resumeData.personalInfo.location}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website/LinkedIn</label>
              <input
                type="url"
                name="website"
                value={resumeData.personalInfo.website}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
            <textarea
              name="summary"
              rows={4}
              value={resumeData.personalInfo.summary}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Education</h2>
            <button
              type="button"
              onClick={addEducation}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Education
            </button>
          </div>

          {resumeData.education.map((edu) => (
            <div key={edu.id} className="bg-gray-50 p-4 rounded-md relative">
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={2}
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>
          ))}

          {resumeData.education.length === 0 && (
            <p className="text-gray-500 text-center py-4">No education entries yet. Add your educational background.</p>
          )}
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            <button
              type="button"
              onClick={addExperience}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Experience
            </button>
          </div>

          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="bg-gray-50 p-4 rounded-md relative">
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                          exp.current ? 'bg-gray-100' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => {
                      updateExperience(exp.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(exp.id, 'endDate', '');
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-gray-700">
                    I currently work here
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="Briefly describe your role and responsibilities"
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                  <button
                    type="button"
                    onClick={() => handleGenerateBullets(exp.id)}
                    disabled={isGenerating || !exp.position || !exp.description}
                    className={`inline-flex items-center px-2 py-1 border border-transparent text-xs rounded-md ${
                      isGenerating || !exp.position || !exp.description
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }`}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {isGenerating ? 'Generating...' : 'Generate Bullets'}
                  </button>
                </div>
                <div className="space-y-2">
                  {exp.bullets.map((bullet, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => {
                          const newBullets = [...exp.bullets];
                          newBullets[index] = e.target.value;
                          updateExperience(exp.id, 'bullets', newBullets);
                        }}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newBullets = exp.bullets.filter((_, i) => i !== index);
                          updateExperience(exp.id, 'bullets', newBullets);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newBullets = [...exp.bullets, ''];
                      updateExperience(exp.id, 'bullets', newBullets);
                    }}
                    className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <PlusCircle className="h-3 w-3 mr-1" /> Add Bullet
                  </button>
                </div>
              </div>
            </div>
          ))}

          {resumeData.experience.length === 0 && (
            <p className="text-gray-500 text-center py-4">No experience entries yet. Add your work history.</p>
          )}
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleSuggestSkills}
                disabled={isGenerating || resumeData.experience.length === 0}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  isGenerating || resumeData.experience.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isGenerating ? 'Suggesting...' : 'Suggest Skills'}
              </button>
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Skill
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="bg-gray-50 p-3 rounded-md flex items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="Skill name"
                  />
                </div>
                <div className="ml-2 w-32">
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {resumeData.skills.length === 0 && (
            <p className="text-gray-500 text-center py-4">No skills added yet. Add your skills or use the AI suggestion feature.</p>
          )}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Projects</h2>
            <button
              type="button"
              onClick={addProject}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Project
            </button>
          </div>

          {resumeData.projects.map((project) => (
            <div key={project.id} className="bg-gray-50 p-4 rounded-md relative">
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Project Description</label>
                <textarea
                  rows={3}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Project Link</label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="https://..."
                />
              </div>
            </div>
          ))}

          {resumeData.projects.length === 0 && (
            <p className="text-gray-500 text-center py-4">No projects added yet. Showcase your work by adding projects.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeForm;