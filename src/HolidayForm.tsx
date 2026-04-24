import type {ChangeEvent, SyntheticEvent,MouseEvent} from "react";
import { useState } from "react"
import type {Holiday} from "./holiday.ts";

type HolidayFormProps = {
    onSave: (holiday: Holiday) => void,
    onCancel: () => void,
    edit?: Holiday
}
const defaultHoliday :Holiday={temperature:0, //in °C
    expectedweathercondition: "rain", //rain, snow, sunshine, storm
    currentenergylevel:5, // 1-10
    plannedlocation:"mountains",//select
    availabletime:0}// In days}
export function HolidayForm(props : HolidayFormProps) {
    const [holiday, setHoliday] = useState<Holiday>(props.edit ?? defaultHoliday);
const[truei,setTrue] = useState(false)
    const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        if (holiday) {
            event.preventDefault();
            props.onSave(holiday);
            setHoliday(defaultHoliday);
            setTrue(true)
            event.currentTarget.reset();
        }
    }
    const onCancel= (e: MouseEvent<HTMLButtonElement>) => {
        setHoliday(defaultHoliday);
        e.currentTarget.closest("form")?.reset()
        props.onCancel();
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name,value} = event.target;
        setHoliday((prev) => {
            let data: string | number = value;
            if (name === "currentenergylevel" || name === "availabletime") {
                data = parseInt(value)
            }
            return {...prev, [name]: data}
        })}
    function toDoList(holiday:Holiday):string[]{
        const todos:string[]=[]
        {
        if(holiday.temperature >= 20 ){
            todos.push("Sonnencremi nischt vergessen")
        }else if(holiday.temperature <= 0){
            todos.push("Jäckli alege")
        }
        else{
            todos.push("Wetter geniessen :D")
        }
        }
        {
            if(holiday.expectedweathercondition.includes("rain")){
                todos.push("RegenJacke anziehen")
            }
            else if(holiday.expectedweathercondition.includes("sunshine")){
                todos.push("Nicht in die Sonne schauen")
            }
            else if(holiday.expectedweathercondition.includes("storm")){
                todos.push("Drinnen bleiben lowkey")
            }
            else if(holiday.expectedweathercondition.includes("snow")){
                todos.push("Schneeman bauen")
            }
        }
        {
            if(holiday.currentenergylevel >= 7) {
                todos.push("In die Welt schreien JIPPPPPPPIIIE")
            }
           else if(holiday.currentenergylevel  <=3) {
                todos.push("Pew Pew ins Köpfchen")
            }
           else{
                todos.push("Normalen Tag überstehen")
            }
        }
        {
            if(holiday.plannedlocation.includes("mountains")){
                todos.push("Wanderschuhe mitnehmen")
            }
           else  if(holiday.plannedlocation.includes("lake")){
                todos.push("Badehose anziehen")
            }
            else if(holiday.plannedlocation.includes("see")){
                todos.push("Nicht vom Mister Hai sterben")
            }
           else if(holiday.plannedlocation.includes("dessert")){
                todos.push("Wasserflasche mitnehmen")
            }
           else{
                todos.push("Valorant spielen")
            }
        }
        {
            if(holiday.availabletime >= 5){
                todos.push("Welt bereisen")
            }
            else{
                todos.push("Aufs Arbeiten vorbereiten")
            }
        }

        return todos
    }


return(
    <>
        <h1>Planer an Ideen die man machen könnte</h1>
        <form onSubmit={onSubmit}>
            <label>Temeratur<input type="number" name="temperature" required  onChange={handleChange} value={holiday?.temperature} /></label>
            <label>Wetter<select name="expectedweathercondition" required onChange={handleChange} value={holiday?.expectedweathercondition} >
                <option value="rain">Regen</option>
                <option value="sunshine">Sonnenschein</option>
                <option value="storm">Sturm</option>
                <option value="snow">Schnee</option>
            </select></label>
            <label>Energielevel<input type="number" name="currentenergylevel" required min={1} max={10} onChange={handleChange} value={holiday?.currentenergylevel} /></label>
            <label>Geplannter Reiseort<select name="plannedlocation" required onChange={handleChange} value={holiday?.plannedlocation} >
                <option value="mountains">Berge</option>
                <option value="lake">See</option>
                <option value="see">Meer</option>
                <option value="dessert">Wüste</option>
                <option value="home">Zuhause</option>
            </select></label>
            <label>Zeit in Tagen<input type="number" name="availabletime" required min={1} onChange={handleChange} value= {holiday?.availabletime} /></label>
            <button type="submit">{props.edit ? "Ändern" : "Erstellen"}</button>
            {props.edit && <button type="reset" onClick={onCancel}>Abbrechen</button>}
        </form>
        <h2>
            Todos
        </h2>
        <ul>
            { truei && toDoList(holiday).map((todo, i) => (
                <li key={i}>{todo}</li>
            ))}
        </ul>


    </>
)

}