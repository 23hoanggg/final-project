import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import '../src/App.css'

export default function TodoApp() {
    const [jobs, setJobs] = useState([
        { id: uuidv4(), nameJob: 'job1', isChecked: false, status: 'active' },
        { id: uuidv4(), nameJob: 'job2', isChecked: false, status: 'active' },
        { id: uuidv4(), nameJob: 'job3', isChecked: false, status: 'active' },
        { id: uuidv4(), nameJob: 'job4', isChecked: false, status: 'active' },
        { id: uuidv4(), nameJob: 'job5', isChecked: false, status: 'active' },
    ]);

    const [job, setJob] = useState("");
    const [filter, setState] = useState('all');

    const submitForm = (event) => {
        event.preventDefault();
        if (job.trim() !== "") {
            const addJob = {
                id: uuidv4(),
                nameJob: job,
                isChecked: false,
                status: 'active',
            };
            setJobs([addJob, ...jobs]);
            setJob("");
        }
    };

    const deleteJob = (id) => {
        const newJobs = jobs.filter((job) => job.id !== id);
        setJobs(newJobs);
    };

    const deleteAll = () => {
        setJobs([]);
    };

    const handleCheck = (id) => {
        setJobs((items) =>
            items.map((job) =>
                job.id === id
                    ? { ...job, isChecked: !job.isChecked, status: job.isChecked ? 'active' : 'completed' }
                    : job
            )
        );
    };

    const filteredJobs = jobs.filter(job => filter === 'all' || job.status === filter);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: 40 }}>#todo</h1>
            <div className="container-todoApp">
                <div className="menu-todoApp">
                    <button onClick={() => setState('all')} className="option">All</button>
                    <button onClick={() => setState('active')} className="option">Active</button>
                    <button onClick={() => setState('completed')} className="option">Completed</button>
                </div>
                <div>
                    <hr></hr>
                </div>
                <div className="box-todoApp">
                    <form onSubmit={submitForm} className="form-add">
                        <input
                            type="text"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                            placeholder="Add a new job"
                            style={{ width: '70%', height: '30px' }}

                        />
                        <button type="submit" className="button-add">Add</button>
                    </form>
                    {filteredJobs.map((job) => (
                        <div key={job.id}>
                            <div className="job">
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: 30,
                                        textDecoration: job.isChecked ? 'line-throu gh' : 'none'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheck(job.id)}
                                        checked={job.isChecked}
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                    {job.nameJob}
                                </span>
                                <button
                                    type="button"
                                    style={{cursor: "pointer",backgroundColor: "transparent",border: 'none'}}
                                    onClick={() => deleteJob(job.id)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="delete-all">
                    <button
                        type="button"
                        onClick={deleteAll}
                        className="button-delete-all"
                    >Delete All
                        <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
