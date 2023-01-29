import React, { createContext, useEffect, useReducer, useRef, useState } from 'react'
import ShowContact from './ShowContact';
import './Style.css'
import { Link } from "react-router-dom"
import AddContact from './AddContact';

export const MyContext = createContext()
let Cont = [];
const inContacts = []
const reducer = (State, action) => {

    switch (action.Type) {
        case "AddContact":
            Cont = [...State, action.Value];
            return Cont;
        case "RemoveContact":
            Cont = State.filter(c => c.id !== action.Value)
            return Cont;
        case "OrderAsc":
            return [...State.sort((C, C1) => {
                return C.nom.toUpperCase() < C1.nom.toUpperCase() ? -1 : C.nom.toUpperCase() > C1.nom.toUpperCase() ? 1 : 0
            })];
        case "OrderDesc":
            return [...State.sort((C, C1) => {
                return C.nom.toUpperCase() < C1.nom.toUpperCase() ? 1 : C.nom.toUpperCase() > C1.nom.toUpperCase() ? -1 : 0
            })];
        default:
            return State;
    }
}


function Home() {
    const [Contact, setContact] = useState(false);
    const [contacts, dispatch] = useReducer(reducer,  inContacts);
    const searchNomR = useRef("");
    const [searchList, setSearchList] = useState([]);
    const rechercheC = () => {
        setContact(false)
        const temp = contacts.filter(c => c.ville.toUpperCase() === searchNomR.current.value.toUpperCase());
        temp.length === 0 ? console.log('Aucun Contactes'): setSearchList(temp);
    }
    const vide = () => {
        setSearchList([])
        setContact(false);
        searchNomR.current.value = ""
    }
    useEffect(() => {
        setSearchList(contacts.filter(c => c.ville.toUpperCase() === searchNomR.current.value.toUpperCase()))
    }, [contacts])
    return (
        <div className='Conteur'>
            <div id='Contactes'>
            <div >
                <div id="NavBar">
                    <div  onClick={vide}>
                        <Link to="/" >
                            <h1> <span>C</span> ontact</h1>
                        </Link>
                    
                    </div>
                    
              
                </div>
                
                
               
                {
                    Contact === false && <>
                     
                   
                        <div >
                        <div id='Search'>
                        <input ref={searchNomR} type="text" placeholder='Entrer Le Nom de Ville' className='form-control' id='rech'/>
                        <button onClick={rechercheC} className='btn' id='r'>
                                rechercher
                            </button>
                    </div>
                            {
                                 searchList.length > 0 ? <MyContext.Provider value={{ contacts: searchList, dispatch: dispatch }}><ShowContact /></MyContext.Provider> : <MyContext.Provider value={{ contacts: contacts, dispatch: dispatch }}><ShowContact /></MyContext.Provider>
                            }
                        </div>
                      
                        
                        <div className='btns'>
                            <button  onClick={() => dispatch({ Type: "OrderAsc" })} className='btn' id='trier'>
                                
                                Trier A-Z
                            </button>
                            
                            <button onClick={() => dispatch({ Type: "OrderDesc" })} className='btn'  id='trier'>
                                Trier Z-A
                              
                            </button>
                           
                    <button className='btn' id='Ajouter'  onClick={() => { setContact(true) }}>
                               
                               Ajouter Contact
                           </button>
                    

                        </div>
                      
                     
                    
                    </>
                }
                {
                    Contact && <MyContext.Provider value={{setContact: setContact, contacts: contacts, dispatch: dispatch }}><AddContact /></MyContext.Provider>
                }
            </div>
        </div>
        </div>
    )
}

export default Home