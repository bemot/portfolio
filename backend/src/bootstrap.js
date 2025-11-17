module.exports = async () => {
  console.log('🔧 Running bootstrap - setting public permissions...');
  
  try {
    // Get the public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      console.error('❌ Public role not found!');
      return;
    }

    console.log('✅ Found public role:', publicRole.id);

    // Define permissions to enable
    const permissionsToEnable = [
      'api::personal-data.personal-data.find',
      'api::personal-data.personal-data.findOne',
      'api::experience.experience.find',
      'api::experience.experience.findOne',
      'api::education.education.find',
      'api::education.education.findOne',
      'api::project.project.find',
      'api::project.project.findOne',
      'api::skill.skill.find',
      'api::skill.skill.findOne',
      'api::contact-form.contact-form.find',
      'api::contact-form.contact-form.findOne',
      'api::coursera-cetificat.coursera-cetificat.find',
      'api::coursera-cetificat.coursera-cetificat.findOne',
    ];

    // Enable each permission
    for (const action of permissionsToEnable) {
      await strapi.query('plugin::users-permissions.permission').updateMany({
        where: { 
          role: publicRole.id,
          action: action
        },
        data: { enabled: true }
      });
      console.log('✅ Enabled:', action);
    }

    console.log('🎉 All permissions enabled successfully!');
  } catch (error) {
    console.error('❌ Error setting permissions:', error);
  }
};
