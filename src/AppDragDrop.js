import React, { Component } from 'react';
import './App.css';
import { blackBright, red } from 'ansi-colors';
import { arrayExpression } from '@babel/types';

export default class AppDragDrop extends Component {
    state = {
        tasks: [

            
            {name:"V", category:"menu", service:"movie"},
            {name:"E", category:"menu", service:"series"},
            {name:"S", category: "menu", service:"youtube"},
            {name:"T", category:"menu", service:"internet"},
            {name:"E", category:"menu", service:"game"},
            {name:"L", category: "menu", service:"phone"},

        ]
    }
    onDragStart = (ev, id)=>{
        console.log('dragstart :', id);
        ev.dataTransfer.setData("id", id);


    }
    onDragOver = (ev)=>{
        ev.preventDefault();
    }
    onDrop = (ev, cat)=>{
        let dropOrder = 0;
        console.log(dropOrder);
        
        let id = ev.dataTransfer.getData("id");
        let tasks = this.state.tasks.filter(
            (task)=> {
                
                if(task.service == id){
                    task.category = cat;


                }
                return task;
            }
        );

        this.setState({
            ...this.state.tasks,
            tasks
        });

    }
    atTheCustom= ()=> {
        const item = {
 
            border: 0
            
            
        };
        
        return (
            item
        );
    }
    atTheMenu= ()=> {
        const item = {
            resize:"none"
        };

        return (
            item

        );
    }

    render(){
        let tasks = {
            menu:[],
            custom: []
        }
        this.state.tasks.forEach((t)=>{
            tasks[t.category].push(
                <div key={t.service} 
                onDragStart={ (e)=>this.onDragStart(e, t.service)}
                 draggable
                className={t.category==="menu"?"draggable-in-menu":"draggable-in-custom"} 
                
                style = {t.category==='menu'?this.atTheMenu():(this.atTheCustom()) }
                >
                    {t.name}
                </div> 
            );

        });
        return (
            <div className="container-drag">
                <h2 className="header">Drag Drop For Vestel</h2>
                <div className="menu" 
                onDragOver={(e)=>this.onDragOver(e)}  
                onDrop={(e)=>this.onDrop(e,"menu")} 
                                 
                >
                    <span className="task-header">MENU<br/></span>
                    {tasks.menu}
                    

                </div>
                
                <div className="droppable" 
                 onDragOver={(e)=>this.onDragOver(e)} 
                 onDrop = {(e)=>this.onDrop(e,"custom")} 
                  > 
                 <span className="task-header">Customize Your Services</span><br/>
                 {tasks.custom}
                    
                </div>
                

            </div>
        );
    }
}