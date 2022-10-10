export const SearchNav = () => {
    function onSubmit() {
        console.log(`Form submitted: `);
    }
    
    return (
        <>
            <div className="searchnav">
                <form>
                    <div className="pantry-switch">
                        <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label className="toggle-switch-label" for="toggleSwitch">
                            Use Pantry
                        </label>
                    </div>
                    <div className="vegan-switch">
                        <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label className="toggle-switch-label" for="toggleSwitch">
                            Vegan
                        </label>
                    </div>
                    <div className="gf-switch">
                        <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label className="toggle-switch-label" for="toggleSwitch">
                            Gluten Free
                        </label>
                    </div>
                    <div className="custom-switch">
                        <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label className="toggle-switch-label" for="toggleSwitch">
                            Custom Diet
                        </label>
                    </div>
                    <div className="slidecontainer">
                        <input type="range" min="1" max="100"  id="myRange"/>
                        <br/>
                        <label className="toggle-switch-label" for="toggleSwitch">
                            Rating
                        </label>
                    </div>
                    <div>
                        <input type="range" id="vol" name="vol" min="0" max="50"/>
                        <br/>
                        <label for="vol">Volume (between 0 and 50):</label>
                        
                    </div>
                    
                    <div>
                        <label for="quantity">Number of Ingredients (between 1 and 5):</label>
                        <input type="number" id="quantity" name="quantity" min="1" max="5"/>
                    </div>

                    <div>
                        <label for="quantity">Recipe Time (between 1 and 5):</label>
                        <input type="number" id="quantity" name="quantity" min="1" max="5"/>
                    </div>
                    <div>
                        <input type="submit" onClick={onSubmit} value="Submit" />
                    </div>

                </form>
                   
                   
            </div>

        </>
    );
}