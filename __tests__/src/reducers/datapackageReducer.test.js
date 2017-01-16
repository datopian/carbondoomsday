import reducer from '../../../src/reducers/datapackageReducer'

describe('update reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      datapackage: {},
      resources: []
    })
  })

  it('should handle RECEIVE_DATAPACKAGE', () => {
    expect(reducer(undefined, {
      type: 'RECEIVE_DATAPACKAGE',
      dp: {
        description: 'test description',
        resources: ['test resource'],
        views: ['test view']
      }
    })).toEqual(
      {
        datapackage: {
          description: 'test description',
          resources: ['test resource'],
          views: ['test view']
        },
        resources: []
      }
    )
  })

  it('should handle RECEIVE_RESOURCE', () => {
    expect(reducer(undefined, {
      type: 'RECEIVE_RESOURCE',
      resources: [
        ["name", "size"], ["gb", "100"],
        ["us", "200"], ["cn", "300"], [""]
      ]
    })).toEqual(
      {
        datapackage: {},
        resources: [
          [
            ["name", "size"], ["gb", "100"],
            ["us", "200"], ["cn", "300"], [""]
          ]
        ]
      }
    )
  })
})
