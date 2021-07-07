import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/argonauts')
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not fetch data')
        }
        return res.json()
      })
      .then(argonauts => setData(argonauts))
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault()
    const argonaut = { 'name': name }
    fetch('/argonauts', {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(argonaut)
    })
      .then(() => console.log('New argonaut sended'))
      .catch((err) => console.log(err))
  }

  return (
    <div >
      {/* Header section */}
      <header>
        <h1>
          <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
          Les Argonautes
        </h1>
      </header>

      {/* Main section */}
      <main>

        {/* New member form */}
        <h2>Ajouter un(e) Argonaute</h2>
        <form className="new-member-form" onSubmit={handleSubmit}>
          <label htmlFor="name">{name}</label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="name" name="name" type="text" placeholder="Charalampos" />
          <button type="submit">Envoyer</button>
        </form>

        {/* Member list */}
        <h2>Membres de l'équipage</h2>
        <section className="member-list row">
          {data && data.map((argonauts) =>
            <div key={argonauts._id} className="member-item column">{argonauts.name}</div>
          )}
        </section>
      </main>

      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
    </div>
  );
}

export default App;
