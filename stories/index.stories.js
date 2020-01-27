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
      margin: '0 2px'
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

export const infinite = () => (
  <Container>
    <Showreel infinite slidesToScroll={2}>
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

export const images = () => (
  <Container>
    <Showreel slidesToScroll={2}>
      <div>
        <img src="https://via.placeholder.com/150" alt="150" />
      </div>
      <div>
        <img src="https://via.placeholder.com/200" alt="200" />
      </div>
      <div>
        <img src="https://via.placeholder.com/250" alt="250" />
      </div>
      <div>
        <img src="https://via.placeholder.com/350" alt="350" />
      </div>
      <div>
        <img src="https://via.placeholder.com/400" alt="400" />
      </div>
      <div>
        <img src="https://via.placeholder.com/300" alt="300" />
      </div>
      <div>
        <img src="https://via.placeholder.com/200" alt="200" />
      </div>
      <div>
        <img src="https://via.placeholder.com/100" alt="100" />
      </div>
      <div>
        <img src="https://via.placeholder.com/300" alt="300" />
      </div>
    </Showreel>
  </Container>
)

const FlexAlignCenter = ({ children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center'
    }}
  >
    {children}
  </div>
)

export const imagesAlignCenter = () => (
  <Container>
    <Showreel slidesToScroll={2}>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/150" alt="150" />
      </FlexAlignCenter>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/200" alt="200" />
      </FlexAlignCenter>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/250" alt="250" />
      </FlexAlignCenter>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/350" alt="350" />
      </FlexAlignCenter>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/400" alt="400" />
      </FlexAlignCenter>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/300" alt="300" />
      </FlexAlignCenter>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/200" alt="200" />
      </FlexAlignCenter>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/100" alt="100" />
      </FlexAlignCenter>
      <FlexAlignCenter>
        <img src="https://via.placeholder.com/300" alt="300" />
      </FlexAlignCenter>
    </Showreel>
  </Container>
)

const FullSize = ({ children, background = 'blue' }) => (
  <div
    style={{
      display: 'block',
      width: '100%',
      height: '300px',
      fontSize: '30px',
      lineHeight: '300px',
      textAlign: 'center',
      margin: 'auto',
      background: background,
      color: 'white'
    }}
  >
    {children}
  </div>
)

export const fullSize = () => (
  <Container>
    <Showreel>
      <FullSize>one</FullSize>
      <FullSize background="red">two</FullSize>
      <FullSize background="black">three</FullSize>
      <FullSize background="grey">four</FullSize>
      <FullSize background="purple">five</FullSize>
      <FullSize background="hotpink">six</FullSize>
    </Showreel>
  </Container>
)
