export const SearchNav = () => {
    
    return (
        <>
            <div className="searchnav">
                <form>
                    <div class="pantry-switch">
                        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Use Pantry
                        </label>
                    </div>
                    <div class="vegan-switch">
                        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Vegan
                        </label>
                    </div>
                    <div class="gf-switch">
                        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Gluten Free
                        </label>
                    </div>
                    <div class="custom-switch">
                        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Custom Diet
                        </label>
                    </div>
                    <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Rating
                        </label>
                    </div>
                    <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
                        <label class="toggle-switch-label" for="toggleSwitch">
                            Difficulty
                        </label>
                    </div>
                </form>
            </div>

        </>
    );
}