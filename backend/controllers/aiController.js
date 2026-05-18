const axios = require('axios');
const Employee = require('../models/Employee');

// @desc    Get AI recommendation
// @route   POST /api/ai/recommend
exports.getRecommendation = async (req, res, next) => {
  try {
    const { employeeId } = req.body;
    let employeesData;

    if (employeeId) {
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        res.status(404);
        throw new Error('Employee not found');
      }
      employeesData = [employee];
    } else {
      employeesData = await Employee.find({});
    }

    if (employeesData.length === 0) {
      return res.status(400).json({ message: 'No employee data to analyze' });
    }

    const promptData = employeesData.map(e => 
      `Name: ${e.name}, Dept: ${e.department}, Skills: ${e.skills.join(', ')}, Score: ${e.performanceScore}, Exp: ${e.experience} yrs.`
    ).join('\n');

    let systemPrompt = `You are an expert HR AI assistant. Analyze the following employee data and provide detailed recommendations.
If it's a single employee, provide: 
1. Promotion Recommendation
2. Training Suggestions
3. Overall AI Feedback Generation (improvement feedback, skill enhancement, etc.)

If multiple employees, provide:
1. Employee Ranking based on score and experience.
2. Promotion suggestions for top performers.
3. Training suggestions for low performers.`;

    // Using Gemini API, or OpenRouter. Let's use OpenRouter format since it is specified in prompt "OpenRouter/OpenAI compatible API".
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.5-flash', // Using gemini via openrouter as an example or use free ones
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Employee Data:\n${promptData}` }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'Employee Performance Analytics',
          'Content-Type': 'application/json'
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    res.json({ recommendation: aiMessage });

  } catch (err) {
    console.error('AI API Error:', err.response?.data || err.message);
    next(err);
  }
};
