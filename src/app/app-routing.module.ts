import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTWComponent } from './dtw/dtw.component';
import { EditDistanceComponent } from './edit-distance/edit-distance.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dtw',
        pathMatch: 'full'
    },
    {
        path: 'dtw',
        component: DTWComponent
    },
    {
        path: 'edit-distance',
        component: EditDistanceComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { };
