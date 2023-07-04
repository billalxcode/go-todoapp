import axios from 'axios'
import { Grid, List } from "@mui/material"
import Task from "./Task"
import React from "react"

interface MyProps {
    toggleShowAlert: any,
    toggleDeleteData: any,
    tasks: TaskProps[]
}
interface TaskProps {
    id?: number,
    task?: string,
    completed?: boolean
    checked?: boolean
}

interface MyState {}

export default class Tasks extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)

        this.toggleTaskChecked = this.toggleTaskChecked.bind(this)
        this.toggleTaskDelete = this.toggleTaskDelete.bind(this)
    }

    toggleTaskChecked({ id, task, completed, checked }: TaskProps): void {
        const data = {
            task: task,
            completed: completed != true
        }

        if (!checked) {
            axios.patch(`http://localhost:1412/tasks/${id}`, data)
            .then(response => {
                this.props.toggleShowAlert("Task completed!", "success")
            })
        }
    }

    toggleTaskDelete(id: number): void {
        axios.delete(`http://localhost:1412/tasks/${id}`)
        .then(response => {
            this.props.toggleDeleteData(id)
            this.props.toggleShowAlert("Task deleted!", "success")
        })
    }

    render() {
        return (
            <Grid container direction="column" justifyContent={"center"} alignContent={"center"} spacing={1}>
                <List sx={{ width: "100%" }}>
                    { this.props.tasks.map((data, i) => {
                        return <Task task={data.task} id={data.id} completed={data.completed} toggleTaskChecked={this.toggleTaskChecked} key={"task-" + data.id} toggleTaskDeleted={this.toggleTaskDelete}></Task>
                    })}
                </List>
            </Grid>
        )
    }
}