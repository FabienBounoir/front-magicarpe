import React, { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { Widget } from "../../../components/Widget/Widget";

export const Board = () => {

    const [widgets, setWidgets] = useState([]);
    const [widgetsAvailables, setWidgetsAvailables] = useState([]);
    const [newWidget, setNewWidget] = useState("");

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getWidgets();
        getAvailablesWidgets();
    }, []);
    
    const addWidget = async () => {
        await fetch("http://localhost:8080/api/widgets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                widget: newWidget
            })
        })
        .then(res => res.json());

        getWidgets();
        setIsVisible(false);
    }

    const getWidgets = async () => {
        let res = await fetch("http://localhost:8080/api/widgets", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then(res => res.json());

        if(res) setWidgets(res);
    }

    const deleteWidget = async (id) => {
        await fetch("http://localhost:8080/api/widgets", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                id
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err))
        getWidgets();
    }

    const getAvailablesWidgets = async () => {
        let res = await fetch("http://localhost:8080/api/users/about.json", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then(res => res.json());
        let servicesNames = res.server.services.map((service) => {
            return service.name;
        })

        setNewWidget(servicesNames[0]);
        setWidgetsAvailables(servicesNames);
    }

    const updateWidget = async (index, value, prop) => {
        let updatedWidgets = [...widgets];
        updatedWidgets[index][prop] = value;

        let res = await fetch("http://localhost:8080/api/widgets", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                widgets: updatedWidgets
            })
        })
        .then(res => res.json())

        getWidgets();
    }

    return (
        <div>
            {isVisible && (
                <Modal setIsVisible={setIsVisible}>
                    <select value={newWidget} onChange={(e) => setNewWidget(e.target.options[e.target.selectedIndex].text)} name="" id="">
                        {widgetsAvailables.map(widget => (
                            <option key={widget} name={widget}>{widget}</option>
                        ))}
                    </select>
                    <button onClick={addWidget}>Créer le widget</button>
                </Modal>
            )}
            <button onClick={() => setIsVisible(true)}>
                Ajouter un widget
            </button>
            <div>
                {widgets.map((widget, index) => (
                    <Widget deleteWidget={deleteWidget} name={widget.name.toLowerCase()} key={index} index={index} updateWidget={updateWidget} widget={widget} />
                ))}
            </div>
        </div>
    )
}