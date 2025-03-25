import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import MainLayout from './pages/Layouts/MainLayout'
import { getAllProjects } from './common/api/APIProject';

export default function App() 
{
  
  const [openProject, setOpenProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [corkboardToggle, setCorkboardToggle] = useState(false);
  const [darkModeOn, setTheme] = useState(false);
  const [openDocument, setOpenDocument] = useState(null);

  useEffect(() => {
    async function getProjects()
    {
      var projects = await getAllProjects();
      setProjects(projects);
    }

    getProjects();
  }, [openProject]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout setOpenDocument={setOpenDocument} projects={projects} setProjects={setProjects} openProject={openProject} setOpenProject={setOpenProject} setCorkboardToggle={setCorkboardToggle}/>}>
          <Route index element={<HomePage setOpenProject={setOpenProject} setOpenDocument={setOpenDocument} openDocument={openDocument} corkboard={corkboardToggle} darkModeOn={darkModeOn} setTheme={setTheme} openProject={openProject}/>} />
        </Route>
      </Routes> 
    </BrowserRouter>
    </>
  )
}