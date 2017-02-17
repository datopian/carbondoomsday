import expect from 'expect'
import reducer from '../../../src/reducers/datapackageReducer'

describe('update reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      descriptor: {}
      , resources: []
      , readme: ''
    })
  })

  it('should handle RECEIVE_DATAPACKAGE', () => {
    expect(reducer(undefined, {
      type: 'RECEIVE_DATAPACKAGE'
      , apiData: {
        descriptor: {
          description: 'test description'
          , resources: ['test resource']
          , views: ['test view']
        }
        , readme: 'this is readme'
      }
    })).toEqual(
      {
        descriptor: {
          description: 'test description'
          , resources: ['test resource']
          , views: ['test view']
        }
        , resources: []
        , readme: 'this is readme'
      }
    )
  })

  it('should handle RECEIVE_RESOURCE', () => {
    expect(reducer(undefined, {
      type: 'RECEIVE_RESOURCE'
      , resources: [
        ['name', 'size'], ['gb', '100']
        , ['us', '200'], ['cn', '300'], ['']
      ]
    })).toEqual(
      {
        descriptor: {}
        , resources: [
            ['name', 'size'], ['gb', '100']
            , ['us', '200'], ['cn', '300'], ['']
        ]
        , readme: ''
      }
    )
  })
})
