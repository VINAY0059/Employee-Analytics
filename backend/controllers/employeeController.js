const Employee = require('../models/Employee');

// @desc    Add new employee
// @route   POST /api/employees
exports.addEmployee = async (req, res, next) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;

    if (!name || !email || !department || !skills || performanceScore === undefined || experience === undefined) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      res.status(400);
      throw new Error('Employee already exists');
    }

    const employee = await Employee.create({
      name, email, department, skills, performanceScore, experience
    });

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all employees
// @route   GET /api/employees
exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

// @desc    Search employee by department or name
// @route   GET /api/employees/search?department=Development
exports.searchEmployees = async (req, res, next) => {
  try {
    const { department, q } = req.query;
    let query = {};
    if (department) query.department = new RegExp(department, 'i');
    if (q) {
      query.$or = [
        { name: new RegExp(q, 'i') },
        { department: new RegExp(q, 'i') }
      ];
    }
    const employees = await Employee.find(query);
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }
    await employee.deleteOne();
    res.json({ id: req.params.id, message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};
