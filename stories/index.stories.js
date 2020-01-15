import React from 'react'
import Showreel from '../src/index'

export default {
  title: 'Showreel',
  component: Showreel
}

const Box = ({ children, width = 300, height = 300 }) => (
  <div
    style={{
      background: 'green',
      width,
      height,
      margin: '0 5px'
    }}
  >
    {children}
  </div>
)

export const basic = () => (
  <Showreel>
    <Box>1</Box>
    <Box width={100} height={100}>
      2
    </Box>
    <Box>3</Box>
    <Box width={200} height={200}>
      4
    </Box>
    <Box width={400} height={400}>
      5
    </Box>
    <Box>6</Box>
    <Box>7</Box>
    <Box width={800} height={200}>
      8
    </Box>
    <Box>9</Box>
  </Showreel>
)
