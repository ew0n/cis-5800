import React from "react";
import firebase from "../firebase/base";
import { SpellInput4160_agenda } from "./cis4160_add_agenda";
import {Button} from 'react-bootstrap';

function Cis4160_agenda() {
  const [spells, setSpells] = React.useState([]);
  const [newSpellName, setNewSpellName] = React.useState();

  React.useEffect(() => {
      const db = firebase.firestore();
      const unsubscribe = db.collection("cis4160_agenda").onSnapshot(snapshot => {
        const spellsData = [];
        snapshot.forEach(doc => spellsData.push({ ...doc.data(), id: doc.id }));
        setSpells(spellsData);
      });
    return unsubscribe
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("cis4160_agenda").add({ name: newSpellName });
  };

  return (

    <div>
      

      <textarea
        value={newSpellName}
        onChange={e => setNewSpellName(e.target.value)}
        className="inputwidth expand"
        placeholder="Enter here..."
      />

      <Button variant="primary" className="addwidth expand" onClick={onCreate}><strong>+</strong></Button>
      <hr/>

      {spells.map(spell => (
        <div key={spell.name}>
          <SpellInput4160_agenda spell={spell}/>
        </div>
      ))}
    </div>


  );
}

export default Cis4160_agenda;