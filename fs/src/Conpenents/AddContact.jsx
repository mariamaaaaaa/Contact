import React, { useContext, useRef } from 'react'
import './Style.css'
import { MyContext } from './Home';

function AddContact() {
    const { contacts, dispatch, setContact } = useContext(MyContext)
    const NomR = useRef(),
        TelR = useRef(),
        VilleR = useRef();

    const Ajouter = () => {
        if (NomR.current.value !== "" && TelR.current.value !== "" && VilleR.current.value !== "") {
            dispatch({ Type: "AddContact", Value: { id: contacts.length + 1, nom: NomR.current.value, telephone: TelR.current.value, ville: VilleR.current.value } })
            
            setContact(false)
        } else {
            window.alert("touts les champs obligatoire");
        }
    }
    return (
        <>
            <div className='Contact'>
                <div className="forms">
                <div>
                    
                    <input type="text" ref={NomR} placeholder='Entrer un Nom ' className='form-control' style={{width:'500px'}} />
                </div>
                <br />
                <div>
                    
                    <input type='tel' ref={TelR} placeholder='Entrer Le Numero de Telephone'  className='form-control' style={{width:'500px'}}/>
                </div>
                <br />
                <div>
                    
                    <input type="text" ref={VilleR} placeholder='Entrer une  Ville'  className='form-control' style={{width:'500px'}}/>
                </div>
                </div>
            </div>
            <br />
            <div  onClick={Ajouter}>
                <button className='btn' id='Ajoute'>
                   
                    Ajouter Contact</button>
            </div>
            
        </>
    )
}

export default AddContact