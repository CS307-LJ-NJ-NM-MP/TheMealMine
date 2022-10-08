export const SearchNav = () => {
    
    return (
        <>
            <div className="searchnav">
                <form>
                    <form class="pantry-switch">
                        <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label className="toggle-switch-label" for="toggleSwitch">
                            Use Pantry
                        </label>
                    </form>
                    <form class="vegan-switch">
                        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Vegan
                        </label>
                    </form>
                    <form class="gf-switch">
                        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Gluten Free
                        </label>
                    </form>
                    <form class="custom-switch">
                        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Custom Diet
                        </label>
                    </form>
                    <form class="slidecontainer">
                        <input type="range" min="1" max="100"  id="myRange"/>
                        <br/>
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Rating
                        </label>
                    </form>
                    <form>
                        <input type="range" id="vol" name="vol" min="0" max="50"/>
                        <br/>
                        <label for="vol">Volume (between 0 and 50):</label>
                        
                    </form>
                    
                    <form>
                        <label for="quantity">Number of Ingredients (between 1 and 5):</label>
                        <input type="number" id="quantity" name="quantity" min="1" max="5"/>
                    </form>

                    <form>
                        <label for="quantity">Recipe Time (between 1 and 5):</label>
                        <input type="number" id="quantity" name="quantity" min="1" max="5"/>
                    </form>

                </form>
                   
                   
            </div>

        </>
    );
}