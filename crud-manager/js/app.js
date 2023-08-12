const app = Vue.createApp({
  data() {
    return {
      showHome: true,
      showCreateForm: false,
      showStudentsList: false,
      displaySearchResults: false, // handle this logic
      newStudent: {
        nom: "",
        prenom: "",
        dateNaissance: "",
        niveauScolaire: ""
      },
      students: [],
      searchQuery: ""
    };
  },
  methods: {
    goToHome() {
      this.showHome = true;
      this.showCreateForm = false;
      this.showStudentsList = false;
      this.displaySearchResults = false;
    },
    goToCreateForm() {
      this.showHome = false;
      this.showCreateForm = true;
      this.showStudentsList = false;
      this.displaySearchResults = false;
    },
    goToStudentsList() {
      this.showHome = false;
      this.showCreateForm = false;
      this.showStudentsList = true;
      this.displaySearchResults = true;
      this.fetchStudents();
    },
    fetchStudents() {
      this.students = searchStudentByName(this.searchQuery);
    },
    submitStudent() {
      if (this.checkIfEmptyValue(this.newStudent)) {
        swal("Error", "Please fill in all fields", "error");
        return;
      }

      const exists = checkIfStudentExists(
        this.newStudent.nom,
        this.newStudent.prenom
      );

      if (exists) {
        swal("Error", "Student already exists", "error");
        return;
      }

      addStudent(this.newStudent);
      swal("Success", "Student added successfully", "success");
      this.resetForm();
    },
    resetForm() {
      this.newStudent = {
        nom: "",
        prenom: "",
        dateNaissance: "",
        niveauScolaire: ""
      };
    },
    editStudent(student) {
      updateStudent(this.student)
    },
    removeStudent(student) {
      deleteStudent(this.student)
    },
    checkIfEmptyValue(student) {
      for (let key in student) {
        if (student.hasOwnProperty(key) && !student[key]) {
          return true;
        }
      }
      return false;
    }
  },
  computed: {
    filteredStudents() {
      return this.students.filter(
        (student) =>
          student.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          student.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
});

app.mount("#app");
