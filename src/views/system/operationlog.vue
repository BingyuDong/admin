<template>
    <div>
        <el-card>
            <el-timeline style="max-width: 600px">
                <el-timeline-item timestamp="2018/4/12" placement="top" v-for="item in 100">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/12 20:46</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-card>
    </div>
</template>
  
<script lang="ts" setup>
</script>
  