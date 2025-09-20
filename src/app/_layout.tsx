import { TaskProvider } from '@/contexts/TaskContext';
import { Feather } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { useFrameworkReady } from '../../hooks/UseFrameworkReady';
import '../styles/global.css';
 
export default function Layout() {

useFrameworkReady();

  return(
  
    <TaskProvider>
      <Drawer screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#4062BB",
        drawerInactiveBackgroundColor: "transparent",
        drawerInactiveTintColor: "#fff",
        drawerActiveTintColor: "#fff",
        drawerHideStatusBarOnOpen: true,
        overlayColor: "trasparent",
        drawerStyle: {
          backgroundColor: "#14213D",
          width: "50%",
          paddingTop: 32,

        },

        sceneStyle: {
          backgroundColor: '#14213D'
        }
       


      }}>

   

      <Drawer.Screen 
        name="index" options={{
        drawerLabel: 'Tarefas',
        drawerIcon: ({color}) => (<Feather name="file-text" size={20} color={color} />

        ),
      }} 
    />
     <Drawer.Screen 
        name="addTask" options={{
        drawerLabel: 'Criar Tarefa',
        drawerIcon: ({color}) => (<Feather name="plus" size={20} color={color} />

        ),
      }} 
     />
      <Drawer.Screen 
        name="statistic" options={{
        drawerLabel: 'Estatística',
        drawerIcon: ({color}) => (<Feather name="pie-chart" size={20} color={color} />

          ),
        }} 
      />
      <Drawer.Screen
        name="settings" options={{
        drawerLabel: 'Configurações',
        drawerIcon: ({color}) => (<Feather name="settings" size={20} color={color} />
        
          ),
        }}
      />
      <Drawer.Screen 
        name="about" options={{
        drawerLabel: 'Sobre',
        drawerIcon: ({color}) => (<Feather name="alert-circle" size={20} color={color} />

          ),
        }}
      />  
      </Drawer>
    </TaskProvider>
 
  )
}

