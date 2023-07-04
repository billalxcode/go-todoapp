import { List, ListItem, ListItemIcon, Checkbox, ListItemText, ListItemButton, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import React, { Fragment, useState } from "react";
import axios from "axios";

interface TaskProps {
    id?: number,
    task?: string,
    completed?: boolean,
    toggleTaskChecked?: any,
    toggleTaskDeleted?: any
}

export default function Task({ task, id, toggleTaskChecked, toggleTaskDeleted, completed = false }: TaskProps) {
    const labelId = 'task-' + id

    const [checked, setChecked] = useState(completed)

    const toggleChecked = () => {
        setChecked(true)
        toggleTaskChecked({id, task, completed, checked})
    }

    return (
        <ListItem
            key={labelId}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={(e) => toggleTaskDeleted(id)}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role="button" dense key={labelId}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        disabled={checked}
                        onChange={(e) => toggleChecked() }
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={task}/>
            </ListItemButton>
        </ListItem>
    )
}