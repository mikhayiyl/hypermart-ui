import styled from "styled-components"
import { mobile } from "../../utilities/Responsive"

export const Container = styled.div`
    
    
    `
export const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
    `


export const Filter = styled.div`
margin: 1.3rem;
${mobile({ margin: '0 20px', display: "flex", flexDirection: 'column' })}

        `

export const FilterText = styled.span`
 font-size: 20px;
 font-weight: 600;
 margin-right: 20px;
 ${mobile({ marginRight: "0" })}
 
 `
export const Title = styled.h2`
`
export const Select = styled.select`
padding: 10px;
margin-right: 20px;
${mobile({ margin: "10px 0" })}

`
export const Sort = styled.select``
export const Option = styled.option``