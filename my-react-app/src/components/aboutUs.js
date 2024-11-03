<form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Passenger's Email ID</label>
                <div className="col-sm-10">
                    <input 
                        type="email" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                        id="inputEmail3" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="Name" className="col-sm-2 col-form-label">Passenger's Name</label>
                <div className="col-sm-10">
                    <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                        id="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
            </div>
            <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                <div className="col-sm-10">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="gender" 
                            id="genderMale" 
                            value="male" 
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                        <label className="form-check-label" htmlFor="genderMale">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="gender" 
                            id="genderFemale" 
                            value="female" 
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                        <label className="form-check-label" htmlFor="genderFemale">
                            Female
                        </label>
                    </div>
                </div>
            </fieldset>
            <div className="row mb-3">
                <label htmlFor="age" className="col-sm-2 col-form-label">Passenger's Age</label>
                <div className="col-sm-10">
                    <input 
                        type="number" 
                        className={`form-control ${errors.age ? 'is-invalid' : ''}`} 
                        id="age" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter passenger's age"
                    />
                    {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="subscribeCheck" 
                            checked={subscribe}
                            onChange={() => setSubscribe(!subscribe)}
                        />
                        <label className="form-check-label" htmlFor="subscribeCheck">
                            Subscribe to newsletters
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>