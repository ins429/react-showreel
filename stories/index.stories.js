import React, { Fragment, useState } from 'react'
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

const Container = ({ children }) => (
  <div style={{ margin: '10px 0' }}>{children}</div>
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

const NumberState = ({ label, defaultValue = 1, children }) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <Fragment>
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={e => setValue(parseInt(e.target.value) || 0)}
        />
      </label>
      {children({ value })}
    </Fragment>
  )
}

export const slidesToScroll = () => (
  <NumberState label="Slides to scroll:" defaultValue={3}>
    {({ value }) => (
      <Container>
        <Showreel slidesToScroll={value}>
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
      </Container>
    )}
  </NumberState>
)

export const speed = () => (
  <NumberState label="Speed:" defaultValue={500}>
    {({ value }) => (
      <Container>
        <Showreel speed={value}>
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
      </Container>
    )}
  </NumberState>
)

export const slidePage = () => (
  <Container>
    <Showreel slidePage>
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
  </Container>
)
