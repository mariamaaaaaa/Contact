import React, { useContext } from 'react'
import { MyContext } from './Home';

function ShowContact() {
    const { contacts, dispatch } = useContext(MyContext)
    return (
        <>
            
            <div id="List">
                {
                    contacts.map(c =>
                        <div className="ContactA" key={c.id}>
                           
                            <div className=''>
                               
                            </div>
                            <div className="FullName">{c.nom}</div>
                            <div className="Phone">{c.telephone}</div>
                            <div className="city">{c.ville}</div>
                            <div className='DeleteButton' onClick={() => dispatch({ Type: "RemoveContact", Value: c.id })}>
                               <button className='btn' id='sup'>suprimer</button>
                            </div>
                        </div>)
                }
            </div>
        </>
    )
}

export default ShowContact