<template>
    <a-collapse>
        <a-collapse-panel key="1"
            header="变化侦测就是用来解决这个问题的，它分为两种类型：一种是“推”（push），另一种是“拉”（pull）。Angular和React的变化侦测属于哪种？用什么实现？">
            <p>Angular和React中的变化侦测都属于“拉”，这就是说当状态发生变化时，它不知道哪个状态变了，只知道状态有可能变了，然后会发送一个信号告诉框架，框架内部收到信号后，会进行一个暴力比对来找出哪些DOM节点需要重新渲染。这在Angular中是脏检查的流程，在React中使用的是虚拟DOM。
            </p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="那么vue的变化侦测是怎么样的呢？">
            <p>所谓更细粒度的更新，就是说：假如有一个状态绑定着好多个依赖，每个依赖表示一个具体的DOM节点，那么当这个状态发生变化时，向这个状态的所有依赖发送通知，让它们进行DOM更新操作。相比较而言，“拉”的粒度是最粗的。
            </p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="vue是'推'，粒度最细，代价是什么？">
            <p>但是它也有一定的代价，因为粒度越细，每个状态所绑定的依赖就越多，依赖追踪在内存上的开销就会越大。因此，从Vue.js2.0开始，它引入了虚拟DOM，将粒度调整为中等粒度，即一个状态所绑定的依赖不再是具体的DOM节点，而是一个组件。这样状态变化后，会通知到组件，组件内部再使用虚拟DOM进行比对。这可以大大降低依赖数量，从而降低依赖追踪所消耗的内存。
            </p>
            <p>Vue.js之所以能随意调整粒度，本质上还要归功于变化侦测。因为“推”类型的变化侦测可以随意调整粒度。</p>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
export default {

}
</script>

<style></style>