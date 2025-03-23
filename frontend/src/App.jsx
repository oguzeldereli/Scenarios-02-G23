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
        <Route path="/" element={<MainLayout projects={projects} setProjects={setProjects} openProject={openProject} setOpenProject={setOpenProject} setCorkboardToggle={setCorkboardToggle}/>}>
          <Route index element={<HomePage corkboard={corkboardToggle} darkModeOn={darkModeOn} setTheme={setTheme}/>} />
        </Route>
      </Routes> 
    </BrowserRouter>
    </>
  )
}