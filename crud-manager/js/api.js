const STUDENTDB = "studentDB";

function getLocalDB() {
  if (!localStorage.getItem(STUDENTDB)) {
    localStorage.setItem(STUDENTDB, JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem(STUDENTDB));
}

function updateDB(db) {
  localStorage.setItem(STUDENTDB, JSON.stringify(db));
}

function addStudent(student) {
  const db = getLocalDB();
  student.id = Date.now().toString();
  db.push(student);
  updateDB(db);
}

function updateStudent(student) {
  const db = getLocalDB();
  const studentIndex = db.findIndex((s) => s.id === student.id);
  if (studentIndex !== -1) {
    db[studentIndex] = {
      nom: student.nom,
      prenom: student.prenom,
      dateNaissance: student.dateNaissance,
      niveauScolaire: student.niveauScolaire,
      id: student.id,
    };
    updateDB(db);
    return db[studentIndex];
  }

  return student;
}

function deleteStudent(student) {
  const db = getLocalDB();
  const updatedDb = db.filter((curStudent) => curStudent.id !== student.id);
  updateDB(updatedDb);
}

function getStudent(id) {
  const db = getLocalDB();
  const filteredDB = db.filter((data) => data.id === id);
  if (filteredDB.length > 0) {
    return filteredDB[0];
  }

  return null;
}

function searchStudentByName(name) {
  const db = getLocalDB();
  const filteredDB = db.filter(
    (data) =>
      data.nom.toLowerCase().includes(name.toLowerCase()) ||
      data.prenom.toLowerCase().includes(name.toLowerCase())
  );

  return filteredDB;
}

function checkIfStudentExists(name, firstname) {
  const db = getLocalDB();
  const filteredDB = db.filter(
    (data) =>
      data.nom.toLowerCase() === name.toLowerCase() &&
      data.prenom.toLowerCase() === firstname.toLowerCase()
  );

  return filteredDB.length > 0;
}
