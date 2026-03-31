import { useBooks } from "../context/BooksContext";
import { MenuItem, Select, Typography, Box } from "@mui/material";
import { useState } from "react";

export default function CourseFilter() {
  const { books } = useBooks();
  
  // Estados separados para disciplina e semestre
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Extrai listas únicas de cursos e semestres
  const courses = [...new Set(books.map(book => book.course))];
  const semesters = [...new Set(books.map(book => book.semester))].sort();

  // Filtra os livros verificando ambas as condições
  const filteredBooks = books.filter(b => {
    const matchCourse = selectedCourse === "" || b.course === selectedCourse;
    const matchSemester = selectedSemester === "" || b.semester.toString() === selectedSemester;
    return matchCourse && matchSemester;
  });

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Filtrar Referências</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Select 
          value={selectedCourse} 
          onChange={e => setSelectedCourse(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Todas as Disciplinas</MenuItem>
          {courses.map(course => (
            <MenuItem key={course} value={course}>{course}</MenuItem>
          ))}
        </Select>

        <Select 
          value={selectedSemester} 
          onChange={e => setSelectedSemester(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Todos os Semestres</MenuItem>
          {semesters.map(semester => (
            <MenuItem key={semester} value={semester.toString()}>{semester}º Semestre</MenuItem>
          ))}
        </Select>
      </Box>

      {/* Renderiza a lista filtrada */}
      {filteredBooks.map((book, idx) => (
        <Typography key={idx} sx={{ mb: 1 }}>
          <strong>{book.title}</strong> - {book.course} ({book.semester}º Semestre)
        </Typography>
      ))}
    </>
  );
}