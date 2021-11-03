import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as actionCreators from '../actions'

const useLocationSynchronizer = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionCreators.storeLocation({ ...location }))
  }, [dispatch, location])
}

export default useLocationSynchronizer
