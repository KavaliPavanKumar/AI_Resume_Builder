import OpenAI from 'openai';

// Note: In a production app, you would use environment variables for the API key
// and implement proper backend authentication
const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your actual API key or use environment variables
  dangerouslyAllowBrowser: true // Only for demo purposes
});

export async function generateBulletPoints(position: string, description: string): Promise<string[]> {
  try {
    // Mock AI suggestions for demo purposes
    // In a real app, you would use the OpenAI API
    const mockSuggestions = [
      `Led cross-functional team to deliver ${position} projects on time and under budget`,
      `Improved ${position} processes resulting in 20% efficiency gain`,
      `Collaborated with stakeholders to define requirements for ${position} initiatives`,
      `Mentored junior team members in ${position} best practices`,
      `Implemented innovative solutions to complex ${position} challenges`
    ];
    
    return mockSuggestions;
    
    // Uncomment below to use actual OpenAI API
    /*
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Generate 5 concise, impactful bullet points for a resume based on the job position and description provided. Focus on achievements, skills, and responsibilities. Use action verbs and quantify results where possible."
        },
        {
          role: "user",
          content: `Generate 5 professional resume bullet points for a ${position} position with this description: ${description}`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0]?.message?.content || '';
    return content.split('\n').filter(line => line.trim().length > 0);
    */
  } catch (error) {
    console.error('Error generating bullet points:', error);
    return ['Failed to generate suggestions. Please try again.'];
  }
}

export async function suggestSkills(position: string): Promise<string[]> {
  try {
    // Mock AI suggestions for demo purposes
    const skillsByPosition: Record<string, string[]> = {
      'Software Engineer': ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Git'],
      'Data Scientist': ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
      'Product Manager': ['Product Strategy', 'User Research', 'Agile', 'Roadmapping', 'Stakeholder Management'],
      'Designer': ['UI/UX', 'Figma', 'Adobe Creative Suite', 'Wireframing', 'Prototyping'],
      'Marketing': ['Content Strategy', 'SEO', 'Social Media', 'Analytics', 'Email Marketing']
    };
    
    // Default skills if position doesn't match
    const defaultSkills = ['Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Adaptability'];
    
    // Find closest match or return default
    const positionLower = position.toLowerCase();
    const matchedPosition = Object.keys(skillsByPosition).find(key => 
      positionLower.includes(key.toLowerCase())
    );
    
    return matchedPosition ? skillsByPosition[matchedPosition] : defaultSkills;
    
    // Uncomment below to use actual OpenAI API
    /*
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a career advisor. Generate a list of 5 relevant skills for the given job position. Return only the skill names separated by commas."
        },
        {
          role: "user",
          content: `What are 5 key skills for a ${position} position?`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0]?.message?.content || '';
    return content.split(',').map(skill => skill.trim());
    */
  } catch (error) {
    console.error('Error suggesting skills:', error);
    return ['Communication', 'Problem Solving', 'Teamwork'];
  }
}