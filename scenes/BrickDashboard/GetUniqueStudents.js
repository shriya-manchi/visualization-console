const getUniqueStudents = (data) => {
  const uniqueStudents = {};

  // Iterate over each data entry
  data.forEach((entry) => {
    const { Student_Id, Student_Name, Correct, Code, Timestamp } = entry;

    // Initialize the student data if not already present
    if (!uniqueStudents[Student_Id]) {
      uniqueStudents[Student_Id] = {
        Student_Id,
        Student_Name,
        Correct: false, // default to false
        Code: [],
        TimeStamp: [],
        Attempts: 0, // Initialize attempts
      };
    }

    // Add code and timestamp to the student's data
    uniqueStudents[Student_Id].Code.push({ Code, Timestamp });
    // Increment the number of attempts
    uniqueStudents[Student_Id].Attempts += 1;
  });

  // Convert the results into an array and sort the Code and TimeStamp arrays by time
  return Object.values(uniqueStudents).map((student) => {
    // Sort by Timestamp
    student.Code.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

    // Now separate the sorted code and timestamps into their respective arrays
    const sortedCodes = student.Code.map((entry) => entry.Code);
    const sortedTimeStamps = student.Code.map((entry) => entry.Timestamp);

    // Update the student object
    student.Code = sortedCodes;
    student.TimeStamp = sortedTimeStamps;

    // Determine if the student has any correct submissions
    student.Correct = data.some(
      (entry) => entry.Student_Id === student.Student_Id && entry.Correct
    );

    return student;
  });
};

export default getUniqueStudents;
