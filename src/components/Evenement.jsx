import React, { Component } from "react";
import 'daisyui/dist/full.css'; // Assurez-vous d'importer DaisyUI

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      events: [],
      newEvent: {
        name: '',
        attendees: '',
        age: '',
      }
    };
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [name]: value
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      events: [...this.state.events, this.state.newEvent],
      newEvent: { name: '', attendees: '', age: '' },
      showForm: false
    });
  };

  render() {
    const { showForm, events, newEvent } = this.state;

    return (
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Evenement</h1>
          <button className="btn btn-primary" onClick={this.toggleForm}>+</button>
        </div>
        {showForm && (
          <form className="mt-4" onSubmit={this.handleSubmit}>
            <div className="form-control mb-4">
              <label className="label" htmlFor="name">
                <span className="label-text">Nom de l'événement</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newEvent.name}
                onChange={this.handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label" htmlFor="attendees">
                <span className="label-text">Nombre de personnes</span>
              </label>
              <input
                type="number"
                id="attendees"
                name="attendees"
                value={newEvent.attendees}
                onChange={this.handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label" htmlFor="age">
                <span className="label-text">Âge</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={newEvent.age}
                onChange={this.handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Créer</button>
          </form>
        )}
        <div className="mt-4">
          {events.map((event, index) => (
            <div key={index} className="stats shadow mb-4">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div className="stat-title">Nom de l'événement</div>
                <div className="stat-value text-primary">{event.name}</div>
                <div className="stat-title">Nombre de personnes</div>
                <div className="stat-value text-primary">{event.attendees}</div>
                <div className="stat-desc">Âge moyen : {event.age}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Evenement;
