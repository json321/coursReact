const initialState = {panier: []}

function panierReducer(state = initialState, action) {
    let nextState
    switch (action.type) {

            case 'ADD_PANIER':
                nextState = {
                    ... state,
                    panier: [...state.panier, action.value]
                }
                return nextState

            case 'UPDATE_PANIER':    
                nextState = JSON.parse(JSON.stringify(state))
                console.log(nextState)
                nextState.panier[action.id].qte +=1
                nextState.panier[action.id].prix = action.prix * nextState.panier[action.id].qte
                return nextState

            case 'DELETE_PANIER':
                nextState = {
                    ... state,
                    panier: [] 
                }
                return nextState
            
            default:
                return state
    }
}

export default panierReducer