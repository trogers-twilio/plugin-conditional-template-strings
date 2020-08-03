import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

const PLUGIN_NAME = 'ConditionalTemplateStringsPlugin';

export default class ConditionalTemplateStringsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    const taskLineTwoDefaultReserved = 'Incoming call from queue {{task.queueName}}';
    const taskLineTwoDefaultAssigned = 'Live | {{helper.durationSinceUpdate}}';
    const taskLineTwoDefaultWrapup = 'Wrap up | {{helper.durationSinceUpdate}}';

    const taskLineTwoCustomReserved = (
      '{{#if task.attributes.conversations.campaign}} '
        + 'Campaign: {{task.attributes.conversations.campaign}} '
      + '{{else}} {{#if task.attributes.directExtension}} '
        + 'Incoming direct call '
      + '{{else}} '
        + `${taskLineTwoDefaultReserved} `
      + '{{/if}}{{/if}}'
    );
    const taskLineTwoCustomAssigned = (
      '{{#if task.attributes.conversations.campaign}} '
        + `${taskLineTwoDefaultAssigned} | Campaign: {{task.attributes.conversations.campaign}} `
      + '{{else}} {{#if task.attributes.directExtension}} '
        + `${taskLineTwoDefaultAssigned} | Direct Call`
      + '{{else}} '
        + `${taskLineTwoDefaultAssigned} | Queue: {{task.queueName}}`
      + '{{/if}}{{/if}}'
    );
    const taskLineTwoCustomWrapup = (
      '{{#if task.attributes.conversations.campaign}} '
        + `${taskLineTwoDefaultWrapup} | Campaign: {{task.attributes.conversations.campaign}} `
      + '{{else}} {{#if task.attributes.directExtension}} '
        + `${taskLineTwoDefaultWrapup} | Direct Call`
      + '{{else}} '
        + `${taskLineTwoDefaultWrapup} | Queue: {{task.queueName}}`
      + '{{/if}}{{/if}}'
    );

    manager.strings.TaskLineCallReserved = taskLineTwoCustomReserved;
    manager.strings.TaskLineCallAssigned = taskLineTwoCustomAssigned;
    manager.strings.TaskLineCallWrapup = taskLineTwoCustomWrapup;

    manager.strings.TaskHeaderStatusPending = taskLineTwoCustomReserved;
    manager.strings.TaskHeaderStatusAccepted = taskLineTwoCustomAssigned;
    manager.strings.TaskHeaderStatusWrapup = taskLineTwoCustomWrapup;
  }
}
