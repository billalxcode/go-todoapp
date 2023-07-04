"use client"

import axios from "axios"
import { Alert, Collapse, Grid} from "@mui/material"
import { FormControl } from '@mui/material'
import { InputLabel, Input, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import Tasks from "@/components/Tasks"

interface TaskProps {
  id?: number,
  task?: string,
  completed?: boolean
}

export default function Home() {
  let [task, setTask] = useState('')
  let [message, setMessage] = useState('')
  let [alertSeverity, setAlertSeverity] = useState('')
  let [showAlert, setShowAlert] = useState(false)
  let [tasks, setTasks] = useState<TaskProps[]>([])

  const handleShowAlert = (message: string = "", severity: string = "info") => {
    setShowAlert(true)
    setAlertSeverity(severity)
    setMessage(message)
    setTimeout(() => {
      setShowAlert(false)
    }, 2000)
  }

  const submitTask = () => {
    const data = {
      task: task,
      completed: false
    }

    axios.post("http://localhost:1412/tasks", data, {
      headers: {
        "Content-Type": "application/json",
      },

    })
      .then((response) => {
        if (response.data.data) {
          handleShowAlert("Task saved", "success")
          let task = response.data.data
          setTasks([...tasks, task])
          setTask("")
        } else {
          handleShowAlert("Error while saving task", "error")
        }
      })
  }

  const deleteData = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const fetchAllData = async () => {
    const response = axios.get("http://localhost:1412/tasks")
    const data = (await response).data
    setTasks(data.data)
  }

  useEffect(() => {
    fetchAllData()
  }, [])
  return (
    <>
      <Grid sx={{ my: ".5rem" }}>
        <Collapse in={showAlert} mountOnEnter unmountOnExit>
          <Alert severity={alertSeverity == "info" ? "info" : alertSeverity == "error" ? "error" : alertSeverity == "success" ? "success" : "info"}>{message}</Alert>
        </Collapse>
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel htmlFor="task">Apa yang akan kamu lakukan?</InputLabel>
          <Input id="task" size="small" fullWidth onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? submitTask() : ''} value={task}></Input>
          <Button variant="contained" sx={{ mt: "5px" }} size="small" onClick={(e) => submitTask()}>New</Button>
        </FormControl>
      </Grid>

      <Tasks toggleShowAlert={handleShowAlert} tasks={tasks} toggleDeleteData={deleteData}></Tasks>
    </>
  )
}
