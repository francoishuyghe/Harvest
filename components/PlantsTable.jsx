import { dbContext } from '../context/databaseContext';
import { useContext, useEffect} from 'react';
import PlantRow from './PlantRow';
import { useGetDocuments } from '../hooks/useAPI'

export default function PlantsTable(){
  const state = useContext(dbContext)
  const [loadingPlants, errorLoadingPlants,  getPlants] = useGetDocuments('plants');

    useEffect(() => {
        if( !state.plants.loaded) getPlants()
      }, [])

    return <div className="plant-table">
      <div className="errors">{errorLoadingPlants}</div>
      {loadingPlants ? <div className="loading">Loading...</div>
      :  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Edit</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
          {state.plants.documents?.map((plant, index) => 
              <PlantRow key={plant.id} plant={plant} index={index} />
          )}
      </tbody>
    </table>
      }
    </div>
}