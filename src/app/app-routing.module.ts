import { Routes, RouterModule } from '@angular/router';
import { ProjetsComponent } from './projets/projets.component';
import { LoginComponent } from './login/login.component';
import { DetailleProjetComponent } from './detaille-projet/detaille-projet.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component'; 
import { DetailleEpicComponent } from './detaille-epic/detaille-epic.component'; 
import  { DetailleUserStoryComponent } from './detaille-user-story/detaille-user-story.component';


const appRoutes: Routes = [
  {path:'user-story/:id', component: DetailleUserStoryComponent},

  { path: '', component:ProjetsComponent },
  { path: 'projets', component:ProjetsComponent },
  { path: 'login', component:LoginComponent },
  { path: 'projet/:id', component:DetailleProjetComponent },
  { path: 'epic/:id', component:DetailleEpicComponent },
  { path: 'profile/:id', component:ProfileComponent },
  { path: '**', component:NotfoundComponent },

];


export const routing = RouterModule.forRoot(appRoutes);
