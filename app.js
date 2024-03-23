const express = require("express");
const app = express();
const port = 3000;

let studentList = [
  {
    id: 1,
    fullname: "Anh Phan",
    age: 25,
    numberClass: "BC58",
  },
  {
    id: 2,
    fullname: "Thiên Nguyễn",
    age: 24,
    numberClass: "VFA",
  },
  {
    id: 3,
    fullname: "Triết Đặng",
    age: 26,
    numberClass: "Dinosour",
  },
];

// Chuyển req, res về json để tiện thao tác
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// Lấy danh sách học sinh (url http://localhost:3000/students)
app.get("/students", (req, res) => {
  res.status(200).send(studentList);
});

// Lấy thông tin chi tiết học sinh
app.get("/students/:id", (req, res) => {
  const params = req.params;
  const id = params.id;
  const index = studentList.findIndex((student) => {
    return student.id == id;
  });
  if (index !== -1) {
    const student = studentList[index];
    res.status(200).send(student);
  } else {
    res.status(404).send("Not found!");
  }
});

// Thêm học sinh
app.post("/students", (req, res) => {
  let student = req.body;
  student = {
    id: Math.random(),
    ...student,
  };
  studentList = [...studentList, student];
  res.status(201).send(student);
});

// Cập nhật thông tin học sinh
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { fullname, age, numberClass } = req.body;
  const index = studentList.findIndex((student) => {
    return student.id == id;
  });

  if (index != -1) {
    const oldStudent = studentList[index];
    const newStudent = {
      ...oldStudent,
      fullname,
      age,
      numberClass,
    };
    studentList[index] = newStudent;
    res.status(200).send(newStudent);
  } else {
    res.status(404).send("Not found!");
  }
});

// Xoá học sinh
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const index = studentList.findIndex((student) => {
    return student.id == id;
  });

  if (index != -1) {
    const student = studentList[index];
    studentList = studentList.filter((student) => student.id != id);
    res.status(200).send(student);
  } else {
    res.status(404).send("Not found!");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
