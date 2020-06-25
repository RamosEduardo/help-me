import	Login	from	'./Pages/LogIn.vue'
import	NewUser	from	'./Pages/NewUser.vue'
import	Remember	from	'./Pages/Remember.vue'
import	SwitchProfile	from	'./Pages/SwitchProfile.vue'
import	HelperFormList	from	'./Pages/HelperFormList.vue'
import	HelpedFormList	from	'./Pages/HelpedFormList.vue'
import	Home	from	'./Pages/Home.vue'

export const	routes =	[
  {	path:	'/',	component:	Login	},
  {	path:	'/new',	component:	NewUser	},
  {	path:	'/remember',	component:	Remember	},
  {	path:	'/switch-profile',	component:	SwitchProfile	},
  {	path:	'/helper-create',	component:	HelperFormList	},
  {	path:	'/helped-create',	component:	HelpedFormList	},
  {	path:	'/home',	component:	Home	},
]
