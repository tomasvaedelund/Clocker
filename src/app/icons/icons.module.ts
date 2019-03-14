import { NgModule } from '@angular/core';

import { IconLogIn, IconLogOut } from 'angular-feather';

const icons = [IconLogIn, IconLogOut];

@NgModule({
  exports: icons
})
export class IconsModule {}
